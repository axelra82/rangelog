import {
	Component,
	JSXElement,
	Show,
} from "solid-js";

interface ConditionalWrapperInterface {
	condition: boolean;
	wrapper: (children: JSXElement) => JSXElement;
	children: JSXElement;
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
	* @returns {JSXElement} The wrapped children.
	*/
export const ConditionalWrapper: Component<ConditionalWrapperInterface> = (props): JSXElement => (
	<Show
		when={props.condition}
		fallback={props.children}
	>
		{props.wrapper(props.children)}
	</Show>
);
