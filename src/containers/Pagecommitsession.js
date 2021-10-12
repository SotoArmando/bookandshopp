import PropTypes from 'prop-types';

export default function Pagecommitsession({ children }) {
  return (
    [children,
      <div key="Pagecommitsession" className="allsize row wrap gbasis_43">
        <div>
          associated
        </div>
        <div>
          aass
        </div>
      </div>,
    ]
  );
}

Pagecommitsession.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
