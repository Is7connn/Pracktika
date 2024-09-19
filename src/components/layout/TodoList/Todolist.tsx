"use client";

import React from "react";
import scss from "./TodoList.module.scss";
import { useForm } from "react-hook-form";
import { useGetTodoQuery, usePostTodoMutation } from "@/redux/api/me";

interface TodoFormData {
  name: string;
}

const Todolist = () => {
  const { register, handleSubmit, reset } = useForm<TodoFormData>();
  const { data: todos, isLoading, isError, error } = useGetTodoQuery();
  const [postTodo, { isLoading: isPosting }] = usePostTodoMutation();

  const onSubmit = async (formData: TodoFormData) => {
    try {
      console.log(formData);
      await postTodo(formData).unwrap();
      reset();
    } catch (err) {
      console.error("Ошибка ", err);
    }
  };

  return (
    <div className={scss.TodoList}>
      <div className={scss.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              style={{
                paddingRight: "10%",
              }}
              htmlFor="name"
            >
              Имя
            </label>
            <input id="name" {...register("name", { required: true })} />
          </div>
          <button type="submit" disabled={isPosting}>
            {isPosting ? "Отправка." : "Добавить"}
          </button>
        </form>
        {isError && <p style={{ color: "red" }}>Ошибка: {error?.toString()}</p>}{" "}
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          <div className={scss.todoList}>
            {todos && todos.length > 0 ? (
              todos.map((el, idx) => (
                <div key={idx}>
                  <p>{el.name}</p>
                </div>
              ))
            ) : (
              <p>Задач нет</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todolist;
