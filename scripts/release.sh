#!/bin/zsh

# Stop if there are any errors.
set -e;

CHANGELOG_FILE="CHANGELOG.md";
PACKAGE_FILE="package.json";

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD);
TARGET_BRANCH="main";

OWNER=$(git remote get-url origin | sed -E "s/^git@github\.com:(.+)\/.+$/\1/");
REPO=$(git remote get-url origin | sed -E "s/^git@github\.com:.+\/(.+)\.git$/\1/");
RELEASES_URL="/repos/$OWNER/$REPO/releases";

# Use Gum to select version increment type.
VERSION_TYPE=$(gum choose "patch" "minor" "major");

git_check() {
    # Ensure the user is on the main branch.
    if [ $CURRENT_BRANCH != $TARGET_BRANCH ]; then
        echo "Error: You are not on the \"main\" branch."
        exit 1
    fi

    # Ensure there are no unstaged changes.
    if ! git diff --quiet; then
        echo "Error: There are unstaged changes in your working directory."
        echo "Commit or stash them before proceeding."
        exit 1
    fi

    # Ensure there are no uncommitted changes in the staging area.
    if ! git diff --cached --quiet; then
        echo "Error: There are uncommitted changes in the staging area."
        echo "Commit or stash them before proceeding."
        exit 1
    fi

    # Pull the latest changes from the remote repository.
    if ! git pull --quiet; then
        echo "Error: Failed to pull the latest changes from the remote repository."
        echo "Resolve any issues and try again."
        exit 1
    fi
}

git_check;

if [[ -z $VERSION_TYPE ]]; then
  echo "No selection made, exiting."
  exit 1
fi

increment_package_version() {
	local TARGET_FILE=$1;
  IFS='.' read -r major minor patch <<< "$(jq -r ".version" "$TARGET_FILE")";

  case $VERSION_TYPE in
    major)
      ((major += 1))
      minor=0
      if [ -n "$patch" ]; then
				patch=0
			fi
      ;;
    minor)
      ((minor += 1))
      if [ -n "$patch" ]; then
				patch=0
			fi
      ;;
    patch)
			if [ -n "$patch" ]; then
      	((patch += 1))
			else
				((minor += 1))
			fi
      ;;
    *)
      echo "Invalid version increment option"
      exit 1
      ;;
  esac

  if [[ -z "$patch" ]]; then
    UPDATED_VERSION="$major.$minor";
  else
    UPDATED_VERSION="$major.$minor.$patch";
  fi

	# Write the updated version to $TARGET_FILE.
	jq --arg new_version "$UPDATED_VERSION" '.version = $new_version' "$TARGET_FILE" > tmpfile && mv tmpfile "$TARGET_FILE";

	echo "$UPDATED_VERSION";
}

update_changelog_file() {
	local TAG_NAME=$1;

	# Generate GitHub release notes.
	GITHUB_RELEASE_NOTES=$(gh api \
		--method POST \
		-H "Accept: application/vnd.github+json" \
		-H "X-GitHub-Api-Version: 2022-11-28" \
		$RELEASES_URL/generate-notes \
		-f "tag_name=$TAG_NAME" -f "target_commitish=$TARGET_BRANCH");

	GITHUB_RELEASE_NOTES_NAME=$(printf "%s" "$GITHUB_RELEASE_NOTES" | jq -r ".name");
	GITHUB_RELEASE_NOTES_BODY=$(printf "%s" "$GITHUB_RELEASE_NOTES" | jq -r ".body");

	# Prepend the new release notes to $CHANGELOG_FILE.
	{
		echo -e "## [$GITHUB_RELEASE_NOTES_NAME]\n$GITHUB_RELEASE_NOTES_BODY\n"
		cat "$CHANGELOG_FILE"
	} > "$CHANGELOG_FILE.tmp" && mv "$CHANGELOG_FILE.tmp" "$CHANGELOG_FILE";
}

git_commit_and_github_release() {
	local NEW_VERSION=$1;

	git add .;
	git commit -m "release: $NEW_VERSION";
	git push;
	git tag $NEW_VERSION;
	git push origin tag $NEW_VERSION;

	gh api \
	--silent \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  $RELEASES_URL \
   -f "tag_name=$NEW_VERSION" \
	 -f "target_commitish=$TARGET_BRANCH" \
	 -F "generate_release_notes=true";
}

if [ -f "$PACKAGE_FILE" ]; then
  NEW_ROOT_VERSION=$(increment_package_version "$PACKAGE_FILE");
	echo "Updated monorepo to version $NEW_ROOT_VERSION";

	update_changelog_file "$NEW_ROOT_VERSION";

	# Update each app package.json
	CHECK_VERSIONS_IN=("admin" "client");
	for APP_DIR in "${CHECK_VERSIONS_IN[@]}"; do
		TARGET_APP="apps/$APP_DIR";

		if [ -d "$TARGET_APP" ]; then
			APP_PACKAGE="$TARGET_APP/$PACKAGE_FILE";

			if [ -f "$APP_PACKAGE" ]; then
				NEW_APP_VERSION=$(increment_package_version "$APP_PACKAGE");
				echo "Updated $APP_DIR app to version $NEW_APP_VERSION";
			else
				echo "No such file: $APP_PACKAGE";
			fi
		else
			echo "No such directory: $APP_DIR";
		fi
	done

	git_commit_and_github_release "$NEW_ROOT_VERSION";
else
  echo "Root $PACKAGE_FILE not found";
  exit 1
fi
