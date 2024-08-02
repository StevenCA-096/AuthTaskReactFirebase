import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, Routes } from "react-router-dom";
import BasicLayout from "../layout/BasicLayout";
import TaskList from "../pages/tasks/TaskList";
import UserLogin from "../pages/auth/login";
import Register from "../pages/auth/Register";
import ListUsers from "../pages/users/listUsers";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<BasicLayout />}>
                <Route path="/" element={<TaskList />}></Route>
                <Route path="/listUsers" element={<ListUsers />}></Route>
            </Route>
            <Route path="/login" element={<UserLogin />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </>
    )
)