#include <napi.h>
#include "ov-server.h"

class OvServerWrapper : public Napi::ObjectWrap<OvServerWrapper> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  OvServerWrapper(const Napi::CallbackInfo& info);
  ov_server_t* GetInternalInstance();
  Napi::Value Stop(const Napi::CallbackInfo& info);

 private:
  static Napi::FunctionReference constructor;
  ov_server_t *actualClass_;
};
