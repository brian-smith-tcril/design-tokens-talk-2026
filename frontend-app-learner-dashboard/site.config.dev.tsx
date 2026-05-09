import { EnvironmentTypes, SiteConfig, footerApp, headerApp, shellApp } from '@openedx/frontend-base';

import { learnerDashboardApp } from './src';

import '@openedx/frontend-base/shell/style';

import { WidgetOperationTypes } from '@openedx/frontend-base';
import type { App } from '@openedx/frontend-base';
import { Card } from '@openedx/paragon';
import type { CSSProperties, ReactNode } from 'react';

const panelCss = `
  .knobby-plugin {
    display: flex;
    gap: 4rem;
    justify-content: center;
    padding: 4px 2rem 0;
    background:
      radial-gradient(circle at 12px 12px, #1a1610 2px, transparent 2px),
      radial-gradient(circle at calc(100% - 12px) 12px, #1a1610 2px, transparent 2px),
      radial-gradient(circle at 12px calc(100% - 8px), #1a1610 2px, transparent 2px),
      radial-gradient(circle at calc(100% - 12px) calc(100% - 8px), #1a1610 2px, transparent 2px),
      linear-gradient(140deg, #e3c388, #87651f);
    box-shadow: 0 2px 5px rgba(0,0,0,.4);
  }
`;

const controlCss = `
  .knobby-control { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .knobby-control__label { font-size: 12px; font-weight: 800; letter-spacing: .15em; }
`;

const faceCss = `
  .knobby-control__face { position: relative; width: 100px; height: 100px; }
  .knobby-control__numeral {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 12px;
    font-weight: 800;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-44px) rotate(calc(-1 * var(--angle)));
  }
  .knobby-control__tick {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 7px;
    background: #1a1a1a;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-44px);
  }
`;

const knobCss = `
  .knobby-control__knob {
    position: absolute;
    inset: 17px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 28%, #fafafa, #6e6e6e);
    box-shadow: inset 0 0 0 8px #161616, 0 4px 8px rgba(0,0,0,.4);
    transform: rotate(calc(-135deg + var(--knob-value) * (270deg / 11)));
  }
  .knobby-control__knob::after {
    content: '';
    position: absolute;
    top: 11px;
    left: 50%;
    width: 2px;
    height: 22px;
    background: #1a1a1a;
    transform: translateX(-50%);
  }
`;

const Panel = ({ children }: { children: ReactNode }) => (
  <div className="knobby-plugin">{children}</div>
);

const NUMERALS = [0, 2, 4, 6, 8, 10, 11];
const TICKS = [1, 3, 5, 7, 9];
const angleOf = (n: number) => `${-135 + n * 270 / 11}deg`;

interface KnobProps {
  value: string;
  label: string;
}

const Knob = ({ value, label }: KnobProps) => (
  <div className="knobby-control" style={{ '--knob-value': value } as CSSProperties}>
    <div className="knobby-control__label">{label}</div>
    <div className="knobby-control__face">
      {NUMERALS.map((n) => (
        <span key={n} className="knobby-control__numeral" style={{ '--angle': angleOf(n) } as CSSProperties}>{n}</span>
      ))}
      {TICKS.map((n) => (
        <span key={n} className="knobby-control__tick" style={{ '--angle': angleOf(n) } as CSSProperties} />
      ))}
      <div className="knobby-control__knob" />
    </div>
  </div>
);

const Knobby = () => (
  <>
    <style>{`${panelCss}${controlCss}${faceCss}${knobCss}`}</style>
    <Card orientation="horizontal" className="mb-3">
      <Card.Body>
        <Panel>
          <Knob value="var(--knobby-plugin-volume-i-knob, 4)" label="VOLUME I" />
          <Knob value="var(--knobby-plugin-volume-ii-knob, 4)" label="VOLUME II" />
        </Panel>
      </Card.Body>
    </Card>
  </>
);

const knobbyApp: App = {
  appId: 'knobby-plugin',
  slots: [
    {
      slotId: 'org.openedx.frontend.slot.learnerDashboard.widgetSidebar.v1',
      id: 'knobby.widget',
      op: WidgetOperationTypes.PREPEND,
      component: Knobby,
    },
  ],
};

const siteConfig: SiteConfig = {
  siteId: 'learner-dashboard-dev',
  siteName: 'Learner Dashboard Dev',
  baseUrl: 'http://apps.local.openedx.io:1996',
  lmsBaseUrl: 'http://local.openedx.io:8000',
  loginUrl: 'http://local.openedx.io:8000/login',
  logoutUrl: 'http://local.openedx.io:8000/logout',

  environment: EnvironmentTypes.DEVELOPMENT,
  apps: [
    shellApp,
    headerApp,
    footerApp,
    learnerDashboardApp,
    knobbyApp,
  ],
  externalRoutes: [
    {
      role: 'org.openedx.frontend.role.profile',
      url: 'http://apps.local.openedx.io:1995/profile/'
    },
    {
      role: 'org.openedx.frontend.role.account',
      url: 'http://apps.local.openedx.io:1997/account/'
    },
    {
      role: 'org.openedx.frontend.role.logout',
      url: 'http://local.openedx.io:8000/logout'
    },
  ],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',

  theme: {
    core: {
      url: 'https://cdn.jsdelivr.net/npm/@openedx/paragon@latest/dist/light.min.css',
    },
    variants: {
      light: {
        url: 'https://cdn.jsdelivr.net/gh/brian-smith-tcril/design-tokens-talk-2026@f0ae2502f6bb2c0dbcaf02b23a2596480a91ed16/brand-up-to-eleven/dist/light.min.css',
      },
    },
    defaults: {
      light: 'light',
    },
  },
};

export default siteConfig;
