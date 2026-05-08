import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';
import { Card } from '@openedx/paragon';

const KNOB_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const renderDialMark = (n) => {
  if (n === 11) {
    return (
      <span
        key={n}
        className="knobby-knob__num knobby-knob__num--eleven"
        style={{ '--n': n }}
      >
        {n}
      </span>
    );
  }
  if (n % 2 === 0) {
    return (
      <span
        key={n}
        className="knobby-knob__num"
        style={{ '--n': n }}
      >
        {n}
      </span>
    );
  }
  return (
    <span
      key={n}
      className="knobby-knob__tick-mark"
      style={{ '--n': n }}
    />
  );
};

const Knob = ({ name, label }) => (
  <div className={`knobby-knob knobby-knob--${name}`}>
    <div className="knobby-knob__label">{label}</div>
    <div className="knobby-knob__dial">
      {KNOB_VALUES.map(renderDialMark)}
      <div className="knobby-knob__body">
        <div className="knobby-knob__tick" />
      </div>
    </div>
  </div>
);

const Knobby = () => (
  <>
    <style>{`
      .knobby-plugin {
        display: flex;
        gap: 4rem;
        align-items: flex-start;
        justify-content: center;
        padding: 4px 2rem 0;
        border-radius: 4px;
        background:
          radial-gradient(circle at 12px 12px, #2a2218 0 1.8px, #1a1610 1.8px 2.6px, transparent 2.8px),
          radial-gradient(circle at calc(100% - 12px) 12px, #2a2218 0 1.8px, #1a1610 1.8px 2.6px, transparent 2.8px),
          radial-gradient(circle at 12px calc(100% - 8px), #2a2218 0 1.8px, #1a1610 1.8px 2.6px, transparent 2.8px),
          radial-gradient(circle at calc(100% - 12px) calc(100% - 8px), #2a2218 0 1.8px, #1a1610 1.8px 2.6px, transparent 2.8px),
          linear-gradient(140deg, #e3c388 0%, #c19a4f 35%, #a87f33 70%, #87651f 100%);
        box-shadow:
          inset 0 1px 0 rgba(255, 240, 200, 0.4),
          inset 0 -1px 0 rgba(0, 0, 0, 0.3),
          0 2px 5px rgba(0, 0, 0, 0.4);
      }
      .knobby-knob {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .knobby-knob__label {
        font-size: 12px;
        font-weight: 800;
        letter-spacing: 0.15em;
        color: #1a1a1a;
        font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      }
      .knobby-knob__dial {
        position: relative;
        width: 100px;
        height: 100px;
      }
      .knobby-knob__num {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 12px;
        font-weight: 800;
        color: #1a1a1a;
        line-height: 1;
        font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
        transform:
          translate(-50%, -50%)
          rotate(calc(-135deg + var(--n) * (270deg / 11)))
          translateY(-44px)
          rotate(calc(135deg - var(--n) * (270deg / 11)));
      }
      .knobby-knob__tick-mark {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 7px;
        background: #1a1a1a;
        border-radius: 1px;
        transform:
          translate(-50%, -50%)
          rotate(calc(-135deg + var(--n) * (270deg / 11)))
          translateY(-44px);
      }
      .knobby-knob__body {
        position: absolute;
        top: 17px;
        left: 17px;
        width: 66px;
        height: 66px;
        border-radius: 50%;
        background:
          radial-gradient(circle at 35% 28%, #fafafa 0%, #d8d8d8 25%, #9a9a9a 60%, #6e6e6e 90%);
        box-shadow:
          inset 0 0 0 8px #161616,
          inset 0 -2px 4px rgba(0, 0, 0, 0.4),
          0 4px 8px rgba(0, 0, 0, 0.45),
          0 1px 2px rgba(0, 0, 0, 0.3);
      }
      .knobby-knob--volume-i .knobby-knob__body {
        transform: rotate(calc(-135deg + var(--knobby-plugin-volume-i-knob, 4) * (270deg / 11)));
      }
      .knobby-knob--volume-ii .knobby-knob__body {
        transform: rotate(calc(-135deg + var(--knobby-plugin-volume-ii-knob, 4) * (270deg / 11)));
      }
      .knobby-knob__tick {
        position: absolute;
        top: 11px;
        left: 50%;
        width: 2px;
        height: 22px;
        background: #1a1a1a;
        border-radius: 1px;
        transform: translateX(-50%);
      }
    `}</style>
    <Card orientation="horizontal" className="mb-3">
      <Card.Body>
        <div className="knobby-plugin">
          <Knob name="volume-i" label="VOLUME I" />
          <Knob name="volume-ii" label="VOLUME II" />
        </div>
      </Card.Body>
    </Card>
  </>
);

const config = {
  pluginSlots: {
    'org.openedx.frontend.learner_dashboard.widget_sidebar.v1': {
      keepDefault: true,
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'knobby_plugin',
            priority: 10,
            type: DIRECT_PLUGIN,
            RenderWidget: Knobby,
          },
        },
      ],
    },
  },
};

export default config;
