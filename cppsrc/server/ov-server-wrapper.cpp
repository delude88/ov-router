#include "ov-server-wrapper.h"

Napi::FunctionReference OvServerWrapper::constructor;

Napi::Object OvServerWrapper::Init(Napi::Env env, Napi::Object exports) {
  Napi::HandleScope scope(env);

  Napi::Function func = DefineClass(env, "OvServerWrapper", {
    InstanceMethod("stop", &OvServerWrapper::Stop),
  });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("OvServerWrapper", func);
  return exports;
}

OvServerWrapper::OvServerWrapper(const Napi::CallbackInfo& info) : Napi::ObjectWrap<OvServerWrapper>(info)  {
  Napi::Env env = info.Env();
  Napi::HandleScope scope(env);

  int length = info.Length();

  if (length != 4) {
    Napi::TypeError::New(env, "Four arguments expected").ThrowAsJavaScriptException();
  }

  if(!info[0].IsNumber()){
    Napi::TypeError::New(env, "First argument is not a number").ThrowAsJavaScriptException();
  }
  if(!info[1].IsNumber()){
    Napi::TypeError::New(env, "Second argument is not a number").ThrowAsJavaScriptException();
  }

  Napi::Number portno = info[0].As<Napi::Number>();
  Napi::Number prio = info[1].As<Napi::Number>();
  Napi::String group = info[2].As<Napi::String>();
  Napi::String name = info[3].As<Napi::String>();
  this->actualClass_ = new ov_server_t(portno.DoubleValue(), prio.DoubleValue(), group, name);
}

ov_server_t* OvServerWrapper::GetInternalInstance() {
  return this->actualClass_;
}
Napi::Value OvServerWrapper::Stop(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    this->actualClass_->stop();
    Napi::String returnValue = Napi::String::New(env, "stopped");
    return returnValue;
}
