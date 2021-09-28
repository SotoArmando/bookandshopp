import { settingskeys } from '../res/formsetup';

export default function Forminputcomponent(
  settings,
  {
    vmargin, hmargin, items = 0, setItems = () => 0,
  },
) {
  const [componentkey, { object }] = settings;

  const margin = `mar_t${vmargin} mar_b${vmargin} mar_l${hmargin} mar_r${hmargin}`;

  const Input = (
    {
      0: key,
      1: {
        holder = false,
        value = false,
        required = true,
        regex = '.{1,}',
        type = 'text',
        maxedcorebox_x: Maxedcoreboxx = 50,
      },
    },
    { name = false } = {},
  ) => (
    <input
      key={`Forminput${key}`}
      name={name || key}
      placeholder={holder || key}
      pattern={regex}
      type={type}
      // In order to spread dynamicly objects it is needed to
      // use spread operator over key-value objects.
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(required ? { required } : {})}
      defaultValue={value || ''}
      className={`corebox_2 border_0 ${margin} maxedcorebox_x${Maxedcoreboxx} input_fix0`}
    />
  );

  return object
    ? [
      '0'
        .repeat(items)
        .split('')
        .map((e, i) => (
          <div key={`Forminputcomponent${e}`} className="row basis_40">
            {Object.entries(settings[1])
              .filter(([key]) => settingskeys.indexOf(key) === -1)
              .map(([key, value]) => Input([key, value], {
                name: `[${componentkey}][${i}][${key}]`,
              }))}
          </div>
        )),
      <input
        key="Forminputcomponentinput"
        type="button"
        className={`col btn_u mar_l${hmargin} mar_r${hmargin} corebox_0 center row f_0 input_fix0`}
        onClick={() => setItems(settings[0])}
        value={`Add ${componentkey} item`}
      />,
    ]
    : Input(settings);
}
