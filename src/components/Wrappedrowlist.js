import React from 'react';
import PropTypes from 'prop-types';

export default function Wrappedrowlist({
  item: Item,
  list,
  handleClick = () => 0,
  basis,
  marginh,
  marginv,
  testid,
  className,
  marginvoff,
  g,
}) {
  const isArrayofObjects = list.every((e) => typeof e === 'object');

  return (
    <div data-testid={testid} className="wrappedrowcontainer">
      <div
        className={`row half_horizontalmar half_verticalmar mbasis_${
          basis - 1
        } ${g || ''}basis_${basis} nmar_l${marginh} nmar_r${marginh} nmar_t${
          marginvoff || marginv
        } nmar_b${marginvoff || marginv} ${className || ''}`}
      >
        {list.map((e, i) => (
          <Item
            key={[Item.name || Item.displayName, i].join('')}
            handleClick={handleClick}
            marginh={marginh}
            marginv={marginv}
            flexgrow={1}
            id={isArrayofObjects ? undefined : e}
            // #eslint-disable-next-line react/jsx-props-no-spreading
            // In order to spread dynamicly objects it is needed to
            // use spread operator over key-value objects.
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...e}
          />
        ))}
      </div>
    </div>
  );
}

Wrappedrowlist.propTypes = {
  item: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.any),
  handleClick: PropTypes.func,
  basis: PropTypes.number,
  marginh: PropTypes.number,
  marginv: PropTypes.number,
  testid: PropTypes.string,
  className: PropTypes.string,
  marginvoff: PropTypes.number,
  g: PropTypes.string,
};

Wrappedrowlist.defaultProps = {
  handleClick: () => 0,
  basis: 43,
  marginh: 12,
  marginv: 12,
  testid: 'Wrappedrowlist',
  item: () => {},
  list: [],
  className: '',
  marginvoff: 0,
  g: '',
};
