import { Injectable } from '@angular/core';
import {
  IconDefinition,
  IconPack,
  IconPrefix,
} from '@fortawesome/fontawesome-svg-core';
import * as allIcons from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root',
})
export class SnButtonService {
  iconDefinitions: Map<string, IconDefinition | IconPack | IconPrefix> =
    new Map();
  constructor() {
    let all = { ...allIcons };
    let key: keyof typeof allIcons;
    for (key in all) {
      this.iconDefinitions.set(key.substring(2), all[key]);
    }

    //console.log(all);
    // this.iconDefinitions.set('coffee', faCoffee);
    // this.iconDefinitions.set('info', faInfo);
  }

  getCurrentIcon(iconName: string): any {
    let icon: IconDefinition | IconPack | IconPrefix = allIcons.faInfo;
    if (this.iconDefinitions.has(iconName)) {
      icon = this.iconDefinitions.get(iconName) || icon;
    }
    return icon;
  }
}
