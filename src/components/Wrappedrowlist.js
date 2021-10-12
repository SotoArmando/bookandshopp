import React, { useState } from 'react';
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
  paginator,
  pagelimit,
  paginate,
  g,
}) {
  const [page, setPage] = useState(0);
  return (
    <div data-testid={testid} className={`wrappedrowcontainer allsize ${className || ''}`}>
      <div
        className={`row half_horizontalmar half_verticalmar mbasis_${
          basis - 1
        } ${g || ''}basis_${basis} nmar_l${marginh} nmar_r${marginh} nmar_t${
          marginvoff || marginv
        } nmar_b${marginvoff || marginv} center`}
      >
        {paginate ? paginator(list, pagelimit, page).map((e, i) => (
          <Item
            key={[Item.name || Item.displayName, i, JSON.stringify(e)].join('')}
            handleClick={handleClick}
            marginh={marginh}
            marginv={marginv}
            flexgrow={1}
            i={i}
            // #eslint-disable-next-line react/jsx-props-no-spreading
            // In order to spread dynamicly objects it is needed to
            // use spread operator over key-value objects.
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...e}
          />
        ))
          : list.map((e, i) => (
            <Item
              key={[Item.name || Item.displayName, i, JSON.stringify(e)].join('')}
              handleClick={handleClick}
              marginh={marginh}
              marginv={marginv}
              flexgrow={1}
              i={i}
            // #eslint-disable-next-line react/jsx-props-no-spreading
            // In order to spread dynamicly objects it is needed to
            // use spread operator over key-value objects.
            // eslint-disable-next-line react/jsx-props-no-spreading
              {...e}
            />
          ))}
      </div>
      {paginate ? (
        <div className="row mobilehide nopointerevents half_horizontalmar half_verticalmar mar_t22 absolute bottom allsize   ">
          <div className="row start gbasis_20 allsize">
            <div className="allsize row space_between items_center">
              <button className="row items_center allpointerevents maxedcorebox_4 f_0 f600 ls_29 maxedcorebox_x7 back_green_o0 fore_9 borderradius_right_30 " type="button" onClick={() => setPage(page > 0 ? page - 1 : page)}>
                <span className="maskicon_prev back_2 contain iconsize_22" />
                {/* {page > 0 ? page - 1 : 0} */}
              </button>
              <button className="row items_center  allpointerevents maxedcorebox_4 f_0 f600 ls_29 maxedcorebox_x7 back_green_o0 fore_9 borderradius_left_30" type="button" onClick={() => setPage(list.length >= (pagelimit * (page + 1)) ? page + 1 : page)}>
                <span className="maskicon_next back_2 contain iconsize_22" />
                {/* {page} */}
              </button>
            </div>
          </div>
        </div>
      ) : []}

      {paginate ? (
        <div className="row desktophide nopointerevents half_horizontalmar half_verticalmar mar_t22 fixed fixed_fix_0 bottom allsize   ">
          <div className="row start gbasis_20 allsize">
            <div className="allsize row space_between items_center">
              <button className="row items_center  allpointerevents maxedcorebox_4 f_0 f600 ls_29 maxedcorebox_x7 back_green_o0 fore_9 borderradius_right_30 " type="button" onClick={() => setPage(page > 0 ? page - 1 : page)}>
                <span className="maskicon_prev back_2 contain iconsize_22" />
                {/* {page > 0 ? page - 1 : 0} */}
              </button>
              <button className="row items_center allpointerevents maxedcorebox_4 f_0 f600 ls_29 maxedcorebox_x7 back_green_o0 fore_9 borderradius_left_30" type="button" onClick={() => setPage(list.length >= (pagelimit * (page + 1)) ? page + 1 : page)}>
                <span className="maskicon_next back_2 contain iconsize_22" />
                {/* {page} */}
              </button>
            </div>
          </div>
        </div>
      ) : []}

    </div>
  );
}

Wrappedrowlist.propTypes = {
  item: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.any),
  handleClick: PropTypes.func,
  basis: PropTypes.number,
  paginator: PropTypes.func,
  marginh: PropTypes.number,
  pagelimit: PropTypes.number,
  marginv: PropTypes.number,
  testid: PropTypes.string,
  className: PropTypes.string,
  marginvoff: PropTypes.number,
  g: PropTypes.string,
  paginate: PropTypes.bool,
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
  pagelimit: 3,
  paginate: false,
  g: '',
  paginator: (list, pagelimit, page) => list.slice(pagelimit * page, (page + 1) * pagelimit),
};
