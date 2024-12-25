(function (window){
  function setSizeConfig(max) {
      var config = {};
      for(var i = 0; i < max; i++) {
          config[i] = `${i}px`;
      }
      return config;
  }
  function setPaddingSizeConfig(max) {
      var config = {};
      for(var i = 0; i < max; i++) {
          config[i] = `${i}%`;
      }
      return config;
  }
  window.tailwind.config = {
      theme: {
        extend: {
          colors: {
            clifford: '#da373d',
          },
          width: setSizeConfig(2000),
          height: setSizeConfig(2000),
          margin: setSizeConfig(1000),
          padding: setPaddingSizeConfig(100),
        }
      }
    }
})(window);
