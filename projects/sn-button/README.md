# SnButton

Angular v17 standalone button component easy to use. It is a part of SnUI Library.

## Importing to Project

- Run `npm i sn-button` to add it in your project.
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

- use `<sn-button>` element to render a button

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

## Further help

Get in touch with me email: nakate.swapnil7@gmail.com | twitter: @SwapnilNakate7
