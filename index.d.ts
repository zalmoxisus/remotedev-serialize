import Immutable from 'immutable'

export namespace RemotedevSerialize {
  function immutable(immutable:typeof Immutable): {
    stringify: (input:any) => string,
    parse: (input:string) => any
  }
}

export default RemotedevSerialize