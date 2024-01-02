import {NavLink} from "react-router-dom";

export const Home: React.FC = () => {
	return <div className="text-slate-600 container animate-fadein p-8">
		<h1 className="mb-5 text-5xl font-light">
			Welcome to the demo/doc app <b>React Model-Validator</b>
		</h1>

		<hr className="my-6 h-0.5 border-t-0 bg-slate-300"/>

		<p>
			This is part of the <b>Model-Validation</b> project, and this part is
			dedicated to demonstrating how to use model-validation and React
			bindings.
		</p>

		<p>
			It uses <b>NPM</b> packages <code className={'text'}>model-validator</code> and <code
			className={'text'}>model-validator-react</code>.
		</p>

		<p className={'mt-10'}>
			There are a few pages for description and a few pages for demonstration. First two, <NavLink
			to={'/principles'}>Model validator</NavLink> and <NavLink to={'/helpers'}>Helper functions</NavLink>, are
			about Model Validator,
			and the <NavLink to={'/ui'}>UI components</NavLink> is about React bindings.
		</p>

		<p>
			The Model Validator itself is framework independent, but together with React it can be very handy to use.
		</p>

		<p className={'bg-fuchsia-500 text-white p-4 rounded-xl my-4'}>
			Read more on <a href="https://lexeykoshkin.medium.com/model-validation-814b2dff65e8" target={'_blank'} className={'underline text-fuchsia-100 hover:text-fuchsia-200'}>Medium</a>.
		</p>


		<p className={'mb-8'}>
			Resources:
		</p>

		<ul className={'ml-8'}>
			<li>
				<a href="https://github.com/lexey111/model-validator" target={'_blank'}>Model Validator Github</a>
			</li>
			<li>
				<a href="https://www.npmjs.com/package/lx-model-validator" target={'_blank'}>Model Validator NPM</a>
			</li>
			<li>
				<a href="https://github.com/lexey111/model-validator-react" target={'_blank'}>Model Validator - React bindings Github</a>
			</li>
			<li>
				<a href="https://www.npmjs.com/package/lx-model-validator-react" target={'_blank'}>Model Validator - React bindings NPM</a>
			</li>
			<li>
				<a href="https://github.com/lexey111/model-validator-demo" target={'_blank'}>This demo App Github</a>
			</li>
		</ul>

		<p className={'my-8'}>
			Used packages:
		</p>

		<ul className={'ml-8'}>
			<li>
				<a href="https://react.dev/" target={'_blank'}>React</a>
			</li>
			<li>
				<a href="https://reactrouter.com/en/main" target={'_blank'}>React Router</a>
			</li>
			<li>
				<a href="https://mobx.js.org/README.html" target={'_blank'}>MobX</a>
			</li>
			<li>
				<a href="https://www.npmjs.com/package/react-tooltip" target={'_blank'}>React tooltip</a>
			</li>
			<li>
				<a href="https://www.typescriptlang.org/" target={'_blank'}>Typescript</a>
			</li>
			<li>
				<a href="https://remarkjs.github.io/react-markdown/" target={'_blank'}>React Markdown</a>
			</li>
			<li>
				<a href="https://tailwindcss.com/" target={'_blank'}>Tailwind CSS</a>
			</li>
			<li>
				<a href="https://headlessui.com/" target={'_blank'}>Headless UI</a>
			</li>
			<li>
				<a href="https://vitejs.dev/" target={'_blank'}>Vite</a>
			</li>
		</ul>
	</div>;
}
