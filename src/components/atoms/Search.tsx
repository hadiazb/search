import * as React from 'react';
import Auto from './Auto';
import '../../styles/components/atoms/Search.scss';

const Search = () => {
	return (
		<div className='search'>
			<h4 className='search__title'>
				Custom AutoComplete React
			</h4>
			<div className='search__search'>
				<Auto />
			</div>
		</div>
	);
};

export default Search;
