import { FlatList } from "react-native";
import styled from "styled-components/native";
import { dataDTO } from "../dtos/dataDTO";


export const Data = styled(FlatList as new () => FlatList<dataDTO>)``;