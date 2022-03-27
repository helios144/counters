import React, { useContext } from "react"
import { Checkbox, Icon, Menu, Item } from "semantic-ui-react"
import { ThemeContext } from "../Contexts/ThemeContext"

export default function ToggleThemeButton({ saveTheme }) {
    const { isDarkMode, setIsDarkMode } = useContext(ThemeContext)

    return (
        <Menu secondary style={{ justifyContent: "end" }}>
            <Item>
                <Icon name={"sun"} />
                <Checkbox
                    toggle
                    checked={isDarkMode}
                    onChange={() => {
                        setIsDarkMode(!isDarkMode)
                        saveTheme(!isDarkMode)
                    }}
                />
                <Icon name={"moon"} />
            </Item>
        </Menu>
    )
}
