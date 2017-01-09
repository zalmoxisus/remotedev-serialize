function mark(data, type, isArray) {
  return {
    data: isArray ? data.toArray() : data.toObject(),
    __remotedevType__: type
  };
}

function extract(data, type) {
  return {
    data: Object.assign({}, data),
    __remotedevType__: type
  };
}

module.exports = function serialize(Immutable) {
  return {
    replacer: function(key, value) {
      if (value instanceof Immutable.Record) return mark(value, 'ImmutableRecord');
      if (value instanceof Immutable.Range) return extract(value, 'ImmutableRange');
      if (value instanceof Immutable.Repeat) return extract(value, 'ImmutableRepeat');
      if (Immutable.OrderedMap.isOrderedMap(value)) return mark(value, 'ImmutableOrderedMap');
      if (Immutable.Map.isMap(value)) return mark(value, 'ImmutableMap');
      if (Immutable.List.isList(value)) return mark(value, 'ImmutableList', true);
      if (Immutable.OrderedSet.isOrderedSet(value)) return mark(value, 'ImmutableOrderedSet', true);
      if (Immutable.Set.isSet(value)) return mark(value, 'ImmutableSet', true);
      if (Immutable.Seq.isSeq(value)) return mark(value, 'ImmutableSeq', true);
      if (Immutable.Stack.isStack(value)) return mark(value, 'ImmutableStack', true);
      return value;
    },

    reviver: function(key, value) {
      if (typeof value === 'object' && value !== null && '__remotedevType__'  in value) {
        var data = value.data;
        switch (value.__remotedevType__) {
          case 'ImmutableMap': return Immutable.Map(data);
          case 'ImmutableOrderedMap': return Immutable.OrderedMap(data);
          case 'ImmutableList': return Immutable.List(data);
          case 'ImmutableRange': return Immutable.Range(data._start, data._end, data._step);
          case 'ImmutableRepeat': return Immutable.Repeat(data._value, data.size);
          case 'ImmutableSet': return Immutable.Set(data);
          case 'ImmutableOrderedSet': return Immutable.OrderedSet(data);
          case 'ImmutableSeq': return Immutable.Seq(data);
          case 'ImmutableStack': return Immutable.Stack(data);
          default: return Immutable.fromJS(data);
        }
      }
      return value;
    }
  }   
};
