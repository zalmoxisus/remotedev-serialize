import Immutable from 'immutable'

type Options = Record<string, boolean>

type Refs = Record<string, any>

type DefaultReplacer = (key:string, value:any) => any

type Replacer = (key:string, value:any, replacer:DefaultReplacer) => any

type DefaultReviver = (key:string, value:any) => any

type Reviver = (key:string, value:any, reviver:DefaultReviver) => any

export namespace RemotedevSerialize {
  function immutable(immutable:typeof Immutable, refs?:Refs, customReplacer?:Replacer, customReviver?:Reviver): {
    stringify: (input:any) => string,
    parse: (input:string) => any,
    serialize: (immutable:typeof Immutable, refs?:Refs, customReplacer?:Replacer, customReviver?:Reviver) => {
      replacer: Replacer,
      reviver: Reviver,
      options: Options
    }  
  }
}

export default RemotedevSerialize
