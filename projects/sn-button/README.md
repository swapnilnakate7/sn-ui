# SnButton

Angular v17 standalone button component easy to use. It is a part of SnUI Library.

## Importing to Project

- Run `npm i sn-button-x` to add it in your project.
- Add to `imports` array as follows

```javascript
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SnButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
```

- use `<sn-button>Submit</sn-button>` element to render a button

## Supported properties

| Attribute  | Supported Type                                |
| ---------- | --------------------------------------------- |
| `type`     | `string` ex. `submit\|reset`                  |
| `disabled` | `boolean`                                     |
| `rounded`  | `boolean`                                     |
| `filled`   | `boolean`                                     |
| `raised`   | `boolean`                                     |
| `icon`     | `string` ex. `coffee`                         |
| `scheme`   | `string` ex. `primary\|warn\|danger\|success` |

based on `scheme` , `rounded`,`filled` and `raised` attribute respective button styles are rendered
`icon` attribute supports font awesome icons

## Examples

#### Text

```html
<sn-button>Default</sn-button>
<sn-button scheme="primary" icon="coffee">Primary</sn-button>
<sn-button scheme="warn" icon="viruscovid">Warn</sn-button>
<sn-button scheme="danger" icon="bugs">Danger</sn-button>
<sn-button scheme="success">Success</sn-button>
<sn-button disabled>Default Disabled</sn-button>
```

#### Text Rounded

```html
<sn-button rounded>Default</sn-button>
<sn-button scheme="primary" rounded>Primary</sn-button>
<sn-button scheme="warn" rounded>Warn</sn-button>
<sn-button scheme="danger" rounded>Danger</sn-button>
<sn-button scheme="success" rounded>Success</sn-button>
<sn-button disabled rounded>Default Disabled</sn-button>
```

#### Text Filled

```html
<sn-button filled>Default</sn-button>
<sn-button scheme="primary" filled>Primary</sn-button>
<sn-button scheme="warn" filled>Warn</sn-button>
<sn-button scheme="danger" filled>Danger</sn-button>
<sn-button scheme="success" filled>Success</sn-button>
<sn-button disabled filled>Default Disabled</sn-button>
```

#### Outlined

```html
<sn-button scheme="default-outlined">Default</sn-button>
<sn-button scheme="primary-outlined">Primary outlined</sn-button>
<sn-button scheme="warn-outlined">Warn</sn-button>
<sn-button scheme="danger-outlined">Danger</sn-button>
<sn-button scheme="success-outlined">Success</sn-button>
<sn-button scheme="default-outlined" disabled>Default Outlined Disabled</sn-button>
```

## Further help

Get in touch with me email: nakate.swapnil7@gmail.com | twitter: @SwapnilNakate7
