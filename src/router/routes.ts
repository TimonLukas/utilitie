import type { RouteRecordRaw } from "vue-router"
import * as views from "@/views"

export const routes = {
  Welcome: {
    path: "/",
    name: "landing",
    component: views.LandingView,
  },
  "JSON schema deref": {
    path: "/json-schema-deref",
    name: "json-schema-deref",
    component: views.JsonSchemaDerefView,
  },
} satisfies Record<string, RouteRecordRaw>
