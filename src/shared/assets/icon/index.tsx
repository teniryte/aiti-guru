import type { SVGProps } from 'react';

import AddIconSvg from './add.svg?react';
import AlertIconSvg from './alert.svg?react';
import CheckIconSvg from './check.svg?react';
import CloseIconSvg from './close.svg?react';
import EyeOffIconSvg from './eye-off.svg?react';
import EyeOnIconSvg from './eye-on.svg?react';
import InfoIconSvg from './info.svg?react';
import LockIconSvg from './lock.svg?react';
import MoreIconSvg from './more.svg?react';
import PersonIconSvg from './person.svg?react';
import PlusIconSvg from './plus.svg?react';
import RefreshIconSvg from './refresh.svg?react';
import SearchIconSvg from './search.svg?react';

const iconsMap = {
  add: AddIconSvg,
  alert: AlertIconSvg,
  check: CheckIconSvg,
  close: CloseIconSvg,
  'eye-off': EyeOffIconSvg,
  'eye-on': EyeOnIconSvg,
  info: InfoIconSvg,
  lock: LockIconSvg,
  more: MoreIconSvg,
  person: PersonIconSvg,
  plus: PlusIconSvg,
  refresh: RefreshIconSvg,
  search: SearchIconSvg,
};

export type IconName = keyof typeof iconsMap;

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

export function Icon({ name, ...props }: IconProps) {
  const Svg = iconsMap[name];

  return <Svg {...props} />;
}
