import { RouteComponentProps } from "react-router-dom";
import { Employee } from "../../../interfaces/employee";

export interface Props extends RouteComponentProps<{ id: string }> {}

export interface State {
	employee: Employee;
}
