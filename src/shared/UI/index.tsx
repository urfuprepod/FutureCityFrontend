import styled from "styled-components";
import File from "./File";

type FlexAlign = "center" | "flex-start" | "flex-end";
type FLexJustify = "space-between" | "center";

export const GridLine = styled.div<{ $minWidth: number }>`
    display: grid;
    grid-template-columns: ${(props) =>
        `repeat( auto-fit, minmax(${props.$minWidth}px, 1fr) )`};
    gap: 20px;
`;

export const Title6 = styled.h6<{ fontSize?: number; margin?: number[] }>`
    margin: 0;
    padding: 0;
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "2rem")};
    color: #252b37;
`;

export const Title1 = styled.h1<{
    fontSize?: number;
    $mb?: number;
    $mt?: number;
    $ml?: number;
    $mr?: number;
}>`
    margin-top: ${(props) => (props.$mt ? `${props.$mt}px` : "0")};
    margin-bottom: ${(props) => (props.$mb ? `${props.$mb}px` : "0")};
    margin-left: ${(props) => (props.$ml ? `${props.$ml}px` : "0")};
    margin-right: ${(props) => (props.$mr ? `${props.$mr}px` : "0")};
    padding: 0;
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : "3rem")};
    color: #252b37;
`;

export const Title2 = styled.h2<{
    fontSize?: number;
    $mb?: number;
    $mt?: number;
    $ml?: number;
    $mr?: number;
}>`
    margin-top: ${(props) => (props.$mt ? `${props.$mt}px` : "0")};
    margin-bottom: ${(props) => (props.$mb ? `${props.$mb}px` : "0")};
    margin-left: ${(props) => (props.$ml ? `${props.$ml}px` : "0")};
    margin-right: ${(props) => (props.$mr ? `${props.$mr}px` : "0")};
    padding: 0;
    font-size: ${(props) =>
        props.fontSize ? `${props.fontSize}px` : "2.1rem"};
    color: #252b37;
`;

export const DescriptionText = styled.p<{
    fontSize?: number;
    $mb?: number;
    $mt?: number;
    $ml?: number;
    $mr?: number;
}>`
    margin-top: ${(props) => (props.$mt ? `${props.$mt}px` : "0")};
    margin-bottom: ${(props) => (props.$mb ? `${props.$mb}px` : "0")};
    margin-left: ${(props) => (props.$ml ? `${props.$ml}px` : "0")};
    margin-right: ${(props) => (props.$mr ? `${props.$mr}px` : "0")};
    padding: 0;
    font-size: ${(props) =>
        props.fontSize ? `${props.fontSize}px` : "1.6rem"};
    color: #a5a5a5;
    font-weight: 500;
`;

export const Input = styled.input<{ $error?: boolean }>`
    display: block;
    border-radius: 6px;
    min-height: 40px;
    border: ${(props) =>
        `1px solid ${props.$error ? "#ff4d4f" : "rgba(114, 128, 142, 0.3)"} `};
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:not(:disabled):focus {
        color: #495057;
        background-color: #fff;
        border-color: ${(props) => (props.$error ? "#ff4d4f" : "#80bdff")};
        outline: 0;
        box-shadow: ${(props) =>
            props.$error ? "none" : "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"};
    }

    &:disabled {
        background: #f0f4fd;
        color: #72808e;
    }
`;

export const TextArea = styled.textarea<{ $error?: boolean }>`
    display: block;
    border-radius: 6px;
    min-height: 85px;
    border: 1px solid rgba(114, 128, 142, 0.3);
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    resize: none;
    padding: 0.375rem 0.75rem;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:not(:disabled):focus {
        color: #495057;
        background-color: #fff;
        border-color: ${(props) => (props.$error ? "#ff4d4f" : "#80bdff")};
        outline: 0;
        box-shadow: ${(props) =>
            props.$error ? "none" : "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"};
    }

    &:disabled {
        background: #f0f4fd;
        color: #72808e;
    }
`;

export const GridLayout = styled.div<{ $gap?: number; $inRow?: number }>`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(${(props) => props.$inRow || 1}, 1fr);
    gap: ${(props) => (props.$gap ? `${props.$gap}px` : "10px")};
`;

export const GridFormLayout = styled.form<{ $gap?: number; $inRow?: number }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.$inRow || 1}, 1fr);
    gap: ${(props) => (props.$gap ? `${props.$gap}px` : "10px")};
`;

export const Flex = styled.div<{
    $isVertical?: boolean;
    gap?: number;
    align?: FlexAlign;
    justify?: FLexJustify;
}>`
    display: flex;
    flex-direction: ${(props) => (props.$isVertical ? "column" : "row")};
    gap: ${(props) => (props.gap ? `${props.gap}px` : "0")};
    align-items: ${(props) => props.align};
    justify-content: ${(props) => props.justify};
`;

export const Button = styled.button<{ $danger?: boolean; $default?: boolean }>`
    min-height: 32px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${(props) => (props.$default ? "#007bff" : "white")};
    font-weight: 500;
    border-radius: 10px;
    padding-inline: 20px;
    line-height: 1;
    font-size: 1.6rem;
    box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
    background: ${(props) =>
        props.$danger ? "#ed1a3b" : props.$default ? "white" : "#467be3"};
    transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    &:where(:hover, :focus) {
        background: #225bce;
    }
`;

// Documents

export const DocumentCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    border: 1px solid #ccc;
    box-shadow: -1px 1px 0 0 #blue;
    cursor: pointer;
    padding: 12px 20px;
`;

export const FileButton = File;

// Graphs

export const GraphContainer = styled.div<{ $max?: boolean }>`
    display: flex;
    flex-direction: column;
    background-color: white;
    align-items: center;
    gap: 12px;
    min-height: 500px;
    width: 100%;
    grid-column: ${(props) => `span ${props.$max ? `2` : "1"}`};
    padding: 20px;
    border: 1px solid #e7eaee;
    box-shadow: none;
    border-radius: 9px;
    transition: all 0.25s ease;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
`;

export const MainContainer = styled.div`
    display: grid;
    gap: 30px;
    align-items: stretch;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
`;

export const Sidebar = styled.aside<{ $collapsed?: boolean }>`
    background: #f1f4fa;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease;
    flex: 0 0 ${(props) => `${props.$collapsed ? `200` : "64"}`}px;
    position: relative;
    overflow: hidden;
    padding: 10px 5px;
    position: sticky;
    top: 0;
    left: 0;
    height: 100dvh;
    z-index: 101;
`;

export const SidebarMenuButton = styled.button<{ $collapsed?: boolean }>`
    width: 32px;
    height: 32px;
    flex: 0 0 32px;
    margin: 0 auto 20px;
    transition: 0.3s;
    background: transparent;
    cursor: pointer;
    padding: 0;
    border: none;
    text-decoration: none;

    img {
        transition: all 0.3s ease;
        transform: ${(props) =>
            props.$collapsed ? "rotate(180deg)" : "rotate(0deg)"};
    }
`;

export const Card = styled.div<{}>`
    padding: 20px;
    border: none;
    border-radius: 6px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
    overflow-wrap: normal;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    background-clip: border-box;
    height: 100%;
`;

export const ErrorTitle = styled.h1`
    color: red;
    text-transform: uppercase;
`;

// document
export const DocumentHeader = styled.strong<{ $fontSize?: number }>`
    font-size: ${(props) =>
        props.$fontSize ? `${props.$fontSize}px` : "1.8rem"};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
`;

export const DocumentSubPoint = styled.span<{ $fontSize?: number }>`
    font-size: ${(props) =>
        props.$fontSize ? `${props.$fontSize}px` : "1.2rem"};
    color: #d5d5d5;
`;
