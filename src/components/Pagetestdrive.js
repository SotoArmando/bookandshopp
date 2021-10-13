import { useHistory } from 'react-router';

export default function Pagetestdrive() {
  const history = useHistory();
  return (
    [
      <div key="Pagetestdrive" className="allsize col gbasis_20 pic_vespa_1 transparent contain ">
        <div className="allsize col center pad_33 back_green_o1">
          <div className="ffam_inter f700 f_5 ls_40 fore_9 center maxedcorebox_7 border_b3      maxedcorebox_x21">BOOK A VESPA TEST-RIDE</div>
          <div className="maxedcorebox_x21 maxedcorebox_7 mobilemaxedcorebox_10 center tcenter fore_9 ">
            There are 34 different versions of the Vespa, Today five series are in production:
            the classic manual transmission PX and the modern  CVT transmission S, LX, GT, and GTS.
            We have showrooms all over the globe which some include test-riding facilities. if
            you wish to find out if a test-ride is avaliable in your area,
            please use the selector below.
          </div>
          <div className="row wrap half_horizontalmar half_verticalmar nmar_l22 nmar_r22">
            <div className="corebox_x10 center corebox_3 half_horizontalmar half_verticalmar mar_l22 mar_r22 btn_u fore_9 border_3">London</div>
            <div
              aria-hidden
              className="corebox_x10 center corebox_3 back_2 half_horizontalmar half_verticalmar mar_l22 mar_r22 fore_green_o0 btn_u"
              onClick={() => history.push('/book')}
            >
              Book now
            </div>
          </div>
        </div>

      </div>,
    ]
  );
}

Pagetestdrive.propTypes = {
};
