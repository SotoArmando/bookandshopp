import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rowitemappointment from '../components/Rowitemappointment';

function Pageappointments({ appointment }) {
  return (
    <div>
      {appointment.map((e) => (
        <Rowitemappointment
          key={JSON.stringify(e)}
          id={e.id}
          name={e.name}
          cardnumber={e.cardnumber}
          expiration={e.expiration}
          cvv={e.cvv}
          created_at={e.created_at}
          authorization={e.authorization}
        />
      ))}
    </div>
  );
}

Pageappointments.propTypes = {
  appointment: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    cardnumber: PropTypes.string,
    expiration: PropTypes.string,
    cvv: PropTypes.string,
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  })).isRequired,

};

const mapStatetoProps = ({
  user: { appointment },
}) => ({ appointment });

export default connect(mapStatetoProps)(Pageappointments);
