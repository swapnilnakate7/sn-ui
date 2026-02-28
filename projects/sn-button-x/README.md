# SnButton

Angular v21 standalone button component easy to use. It is a part of SnUI Library.

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

- use `<sn-button-x>Submit</sn-button-x>` element to render a button

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
<sn-button-x>Default</sn-button-x>
<sn-button-x scheme="primary" icon="coffee">Primary</sn-button-x>
<sn-button-x scheme="warn" icon="viruscovid">Warn</sn-button-x>
<sn-button-x scheme="danger" icon="bugs">Danger</sn-button-x>
<sn-button-x scheme="success">Success</sn-button-x>
<sn-button-x disabled>Default Disabled</sn-button-x>
```

#### Text Rounded

```html
<sn-button-x rounded>Default</sn-button-x>
<sn-button-x scheme="primary" rounded>Primary</sn-button-x>
<sn-button-x scheme="warn" rounded>Warn</sn-button-x>
<sn-button-x scheme="danger" rounded>Danger</sn-button-x>
<sn-button-x scheme="success" rounded>Success</sn-button-x>
<sn-button-x disabled rounded>Default Disabled</sn-button-x>
```

#### Text Filled

```html
<sn-button-x filled>Default</sn-button-x>
<sn-button-x scheme="primary" filled>Primary</sn-button-x>
<sn-button-x scheme="warn" filled>Warn</sn-button-x>
<sn-button-x scheme="danger" filled>Danger</sn-button-x>
<sn-button-x scheme="success" filled>Success</sn-button-x>
<sn-button-x disabled filled>Default Disabled</sn-button-x>
```

#### Outlined

```html
<sn-button-x scheme="default-outlined">Default</sn-button-x>
<sn-button-x scheme="primary-outlined">Primary outlined</sn-button-x>
<sn-button-x scheme="warn-outlined">Warn</sn-button-x>
<sn-button-x scheme="danger-outlined">Danger</sn-button-x>
<sn-button-x scheme="success-outlined">Success</sn-button-x>
<sn-button-x scheme="default-outlined" disabled>Default Outlined Disabled</sn-button-x>
```

## Further help

Get in touch with me email: nakate.swapnil7@gmail.com | twitter: @SwapnilNakate7
