<template>
  <div>
    <div v-for="(taskGroup, index) in tasks" :key="taskGroup.name" class="task-wrapper">
      <div
        class="task-group-title"
        :class="{empty : taskGroup.list.length === 0}"
      >{{taskGroup.name}} <a href="#" @click.prevent="removeCategory(index)"><b-icon icon="delete" size="is-small"></b-icon></a></div>
      

      <draggable
        @start="startDrag"
        @end="endDrag"
        tag="ul"
        class="todo-list dragArea"
        v-model="taskGroup.list"
        group="tasks"
      >
        <transition-group type="transition" name="flip-list">
          <li v-for="task in taskGroup.list" :key="task.text">
            <b-checkbox v-model="task.complete">{{task.text}}</b-checkbox>
          </li>
        </transition-group>
      </draggable>
    </div>

    <draggable
      :class="{active : trashVisible}"
      v-model="trash"
      class="optional remove-task"
      group="tasks"
    >
      <b-icon icon="delete" size="is-small"></b-icon>
    </draggable>

    <div
      class="optional add-new-task"
      v-if="!trashVisible && !addTaskModal"
      @click="addNewTaskModal"
    >
      <b-icon icon="plus" size="is-small"></b-icon>
    </div>

    <modal :active="addTaskModal" name="addTask">
      <div class="addTask">
  
        <b-autocomplete
          v-model="currentTask.category"
          placeholder="Category name"
          :keep-first="true"
          :open-on-focus="true"
          :data="categoryList"
        ></b-autocomplete>

        <b-field label="Message">
          <b-input maxlength="200" minlength="1" type="textarea" v-model="currentTask.text"></b-input>
        </b-field>
        <b-button
          class="btn"
          type="is-primary"
          @click="addTask"
          :disabled="currentTask.text.length === 0"
        >Add task</b-button>
      </div>
    </modal>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import modal from "@/components/modal";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    draggable,
    modal,
  },
  beforeMount() {
    if (localStorage.getItem("tasks")) {
      this.tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    if (localStorage.getItem("currentTask")) {
      this.currentTask = JSON.parse(localStorage.getItem("currentTask"));
    }
  },
  data: () => ({
    trash: [],
    trashVisible: false,
    currentTask: {
      category: "",
      text: "",
    },
    tasks: [
      {
        name: "Hot",
        list: [
          {
            text:
              "Clone the repository to your computer",
            complete: true,
          },
          {
            text: "Load all dependencies",
            complete: true,
          },
          {
            text: "Run build",
            complete: true,
          },
          {
            text: "Open app in browser",
            complete: true,
          },
          {
            text: "Enjoy gorgeous minimalist designs",
            complete: false,
          },
          {
            text: "Poke all sorts of buttons",
            complete: false,
          },
        ],
      },
      {
        name: "Simple task list",
        list: [
          {
            text: 'Check "drag and drop"',
            complete: true,
          },
          {
            text: "Add new task",
            complete: true,
          },
        ],
      },
      {
        name: "Untitled",
        list: [],
      },
    ],
  }),
  computed: {
    ...mapState({
      addTaskModal: (state) => state.modals.addTask,
    }),
    categoryList() {
      let catList = [];
      this.tasks.forEach((cat) => {
        catList.push(cat.name);
      });
      return catList;
    },
  },
  methods: {
    ...mapMutations(["toggleModal"]),
    startDrag() {
      this.trashVisible = true;
    },
    endDrag() {
      this.trashVisible = false;
    },
    addNewTaskModal() {
      this.toggleModal({ name: "addTask", state: true });
    },
    addTask() {
      if (!this.currentTask.category) this.currentTask.category = "Untitled";

      let cat = this.tasks.find(
        (cat) => cat.name === this.currentTask.category
      );
      if (cat) {
        cat.list.push({
          text: this.currentTask.text,
          complete: false,
        });
      } else {
        this.tasks.unshift({
          name: this.currentTask.category,
          list: [
            {
              text: this.currentTask.text,
              complete: false,
            },
          ],
        });
      }

      this.currentTask = {
        category: "",
        text: "",
      };
      this.toggleModal({ name: "addTask", state: false });
    },
    removeCategory(index){
      this.tasks.splice(index, 1);
    }
  },
  watch: {
    tasks: {
      deep: true,
      handler(val) {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      },
    },
    currentTask: {
      deep: true,
      handler(val) {
        localStorage.setItem("currentTask", JSON.stringify(this.currentTask));
      },
    },
    trash(val) {
      val = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.task-wrapper {
  padding-right: 60px;
}
.addTask {
  text-align: left;
  width: 400px;

  @media (max-width: 400px) {
    width: 100%;
  }
}
.optional {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 40px;
  transition: 0.1s linear;
}
.add-new-task {
  background: #7958d5;
}
.remove-task {
  pointer-events: none;
  opacity: 0;
  background: rgba($color: #e70000, $alpha: 0.8);
  &:hover {
    background: red;
  }
  > * {
    display: none;
  }

  .icon {
    display: flex;
    transform: scale(1.5);
    transition: 0.1s linear;
  }

  &.active {
    pointer-events: auto;
    opacity: 1;

    .icon {
      transform: scale(1);
    }
  }
}

.task-group-title {
  padding: 10px 0;
  font-weight: bold;
  background: #fff;
  display: flex;
  justify-content: space-between;

  &.empty {
    opacity: 0.6;
  }
}
.dragArea > span {
  display: block;
  min-height: 20px;
  background: rgb(248, 248, 248);
  border-radius: 5px;
}
.todo-list {
  background: #fff;
  label {
    width: 100%;
    padding: 10px;
  }
  li {
    border-top: none;
    background: #fff;
    &:hover {
      background: #eee;
    }
    &:first-child {
    }
  }
}

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>