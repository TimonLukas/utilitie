<template lang="pug">
.view-json-schema-deref
  .explanation
    h1 Welcome to JSON schema deref!
    p This tool is based on the NPM package&nbsp;
      | #[a.monospace(href="https://www.npmjs.com/package/json-schema-deref-sync") json-schema-deref-sync]
      | which allows you to replace $ref statements in a schema file with the corresponding $defs block!
  .io-area
    .input
      el-alert(
        :type="isInputValidJson ? 'success' : 'error'"
        :closable="false"
      )
        template(#title)
          template(v-if="isInputValidJson") Input is valid JSON
          template(v-else) Input couldn't be parsed as JSON
        template(v-if="!isInputValidJson")
          | {{ inputSchema[1] }}
      el-input(type="textarea" v-model="inputJson")
    el-divider(direction="vertical")
    .output
      el-input(type="textarea" :model-value="outputValue" readonly)
</template>

<script lang="ts" setup>
import { ref, computed, unref } from "vue"

const deref = ref<typeof import("json-schema-deref-sync")>((schema: any, options?: any) => {
  throw new Error("Not loaded yet")
})
import("json-schema-deref-sync").then((mod) => {
  deref.value = mod.default
})

const VALUE_INVALID = Symbol("invalid value")

const inputJson = ref("")
const inputSchema = computed(() => {
  try {
    return JSON.parse(inputJson.value)
  } catch (e) {
    return [VALUE_INVALID, e]
  }
})

const isInputValidJson = computed(() => {
  const schema = unref(inputSchema)

  if (schema === null) {
    return false
  }

  if (Array.isArray(schema) && schema[0] === VALUE_INVALID) {
    return false
  }

  return true
})

const outputSchema = computed(() => {
  if (!isInputValidJson.value) {
    return [VALUE_INVALID, VALUE_INVALID]
  }

  try {
    return deref.value(inputSchema.value)
  } catch (e) {
    return [VALUE_INVALID, e]
  }
})

const outputJson = computed(() => {
  const schema = unref(outputSchema.value)

  if (Array.isArray(schema) && schema[0] === VALUE_INVALID) {
    return [VALUE_INVALID, VALUE_INVALID]
  }

  try {
    return JSON.stringify(schema, null, 2)
  } catch (e) {
    return [VALUE_INVALID, e]
  }
})

const outputValue = computed(() => {
  const output = unref(outputJson)

  if (Array.isArray(output) && output[0] === VALUE_INVALID) {
    if (output[1] === VALUE_INVALID) {
      const schema = unref(outputSchema.value)

      if (!Array.isArray(schema)) {
        return "something went terribly wrong #1"
      }

      if (schema[0] === VALUE_INVALID) {
        if (schema[1] === VALUE_INVALID) {
          return "invalid input dummy"
        }

        console.error(schema[1])
        return schema[1].toString()
      }
    }

    console.error(output[1])
    return output[1].toString()
  }

  return output
})
</script>

<style lang="less" scoped>
.view-json-schema-deref {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2rem;
  padding-right: 2rem;

  .io-area {
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;

    > * {
      height: 100%;
    }

    > .input,
    > .output {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .el-textarea {
        flex: 1;

        :deep(> textarea) {
          height: 100%;
        }
      }
    }
  }
}
</style>
