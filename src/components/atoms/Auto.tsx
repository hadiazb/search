import * as React from 'react';
import '../../styles/components/atoms/Auto.scss';

const Auto = () => {
	const [display, setDisplay] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const [search, setSearch] = React.useState('');
	const wrapperRef = React.useRef(null);

	React.useEffect(() => {
		const pokemon: Array<any> = [];
		const promises = new Array(20)
			.fill(0)
			.map((v, i) =>
				fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`)
			);

		Promise.all(promises).then((pokemonArr) => {
			return pokemonArr.map((value) =>
				value
					.json()
					.then(({ name, sprites: { front_default: sprite } }) =>
						pokemon.push({ name, sprite })
					)
			);
		});

		setOptions(pokemon);
	}, []);

	React.useEffect(() => {
		window.addEventListener('mousedown', handleClickOutside);
		return () => {
			window.removeEventListener(
				'mousedown',
				handleClickOutside
			);
		};
	});

	const handleClickOutside = (event: any) => {
		const { current: wrap } = wrapperRef;
		if (wrap && !wrap.contains(event.target)) {
			setDisplay(false);
		}
	};

	const updatePokeDex = (poke: any) => {
		setSearch(poke);
		setDisplay(false);
	};

	return (
		<div ref={wrapperRef} className='auto'>
			<input
				className='auto__input'
				id='auto'
				onClick={() => setDisplay(!display)}
				placeholder='Type to search'
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>
			{display && (
				<div className='item'>
					{options
						.filter(
							({ name }) => name.indexOf(search.toLowerCase()) > -1
						)
						.map((value, i) => {
							return (
								<div
									onClick={() => updatePokeDex(value.name)}
									className='item__card'
									key={i}
								>
									<span className='item__card-span'>
										{value.name[0].toUpperCase() +
											value.name.slice(1)}
									</span>
									<img
										src={value.sprite}
										alt='pokemon'
										className='item__card-img'
									/>
								</div>
							);
						})}
				</div>
			)}
		</div>
	);
};

export default Auto;
