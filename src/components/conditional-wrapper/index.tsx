import {
	Component,
	JSX,
	Show,
} from "solid-js";

interface ConditionalWrapperInterface {
	condition: boolean;
	wrapper: (children: JSX.Element) => JSX.Element;
	children: JSX.Element;
}

/**
 * Conditionally wrap children in a wrapper component.
 *
 * @example
 * ```tsx
 * <ConditionalWrapper
 * 	condition={someLogicConditionCheckThatReturnsABoolean}
 * 	wrapper={(wrapperChildren) => <div>{wrapperChildren}</div>}
 * >
 * 	{children}
 * </ConditionalWrapper>
 * ```
 *
 * @param condition The condition to check.
 * @param wrapper The wrapper component.
 * @param children The children to wrap.
 *
 * @returns {JSX.Element} The wrapped children.
 */
export const ConditionalWrapper: Component<ConditionalWrapperInterface> = (props): JSX.Element => (
	<Show
		when={props.condition}
		fallback={props.children}
	>
		{props.wrapper(props.children)}
	</Show>
);
