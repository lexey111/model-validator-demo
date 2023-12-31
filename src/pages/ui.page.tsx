import Markdown from 'react-markdown';
import {useEffect} from "react";

const markdownFileContent = (await import('/resources/UI.md?raw')).default;
export const UI: React.FC = () => {
	useEffect(() => {
		setTimeout(() => {
			// @ts-ignore
			Prism.highlightAll();
		}, 0);
	}, []);

	return <div className={'container markdown animate-fadein'}>
		<Markdown>{markdownFileContent}</Markdown>
	</div>;
};
