new Vue({
  el: '#app',
  data: {
    newTask: '',
    taskList: []
  },
  methods: {
    addTask: function() {
      if (this.newTask.trim() !== '') {
        this.taskList.push({ text: this.newTask, completed: false });
        this.newTask = '';
      }
    },
    removeTask: function(index) {
      this.taskList.splice(index, 1);
    }
  }
});
