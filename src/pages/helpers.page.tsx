import {useEffect} from "react";
import Markdown from "react-markdown";

const markdownFileContent = (await import('/resources/HELPERS.md?raw')).default;

export const Helpers: React.FC = () => {
	useEffect(() => {
		setTimeout(() => {
			// @ts-ignore
			Prism.highlightAll();
		}, 0);
	}, []);

	return <div className={'container markdown animate-fadein'}>
		<Markdown>{markdownFileContent}</Markdown>
	</div>;
}
