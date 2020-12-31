#include <napi.h>
#include "server/ov-server-wrapper.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
  return OvServerWrapper::Init(env, exports);
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll)
