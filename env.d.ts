/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/vue3" />

declare module "~icons/*" {
  import { FunctionalComponent, SVGAttributes } from "vue"
  const component: FunctionalComponent<SVGAttributes>
  export default component
}

declare module "json-schema-deref-sync" {
  function deref(
    schema: Record<string, any>,
    options?: Partial<{
      baseFolder: string
      failOnMissing: boolean
      mergeAdditionalProperties: boolean
      removeIds: boolean
      loaders: Record<string, unknown>
    }>
  ): Record<string, any>

  export = deref
}
