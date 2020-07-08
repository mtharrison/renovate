The `concourse` manager has no `fileMatch` default patterns, so it won't match any files until you configure it with a pattern. This is because there is no commonly accepted file/directory naming convention for concourse YAML files and we don't want to check every single `*.yaml` file in repositories just in case any of them contain concourse definitions.

If most `.yaml` files in your repository are concourse ones, then you could add this to your config:

```json
{
  "concourse": {
    "fileMatch": ["\\.yaml$"]
  }
}
```

If instead you have them all inside a `k8s/` directory, you would add this:

```json
{
  "concourse": {
    "fileMatch": ["k8s/.+\\.yaml$"]
  }
}
```

Or if it's just a single file then something like this:

```json
{
  "concourse": {
    "fileMatch": ["^config/k8s\\.yaml$"]
  }
}
```
