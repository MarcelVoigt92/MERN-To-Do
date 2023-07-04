import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import createTodoRequest from "../api/createTodoRequest";
import { TokenContext } from "../App";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  padding: 8px;
  margin-right: 6px;
`;

const Button = styled.button`
  height: 35px;
  outline: none;
  border: none;
  color: white;
  background-color: #00c348;
`;

export const CreateTodoForm = () => {
  const [text, setText] = useState("");
  const [token] = useContext(TokenContext);

  const queryClient = useQueryClient();

  const { mutate: createTodo } = useMutation(
    (newTodo) => createTodoRequest(newTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (!text) return;
        createTodo({
          text,
        });
        setText("");
      }}
    >
      <Input
        onChange={(e) => setText(e.target.value)}
        value={text}
        type="text"
      />
      <Button>Create</Button>
    </Form>
  );
};
