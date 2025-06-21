import * as React from "react";
import { TbBrightness } from "react-icons/tb";

import { Button } from "~/components/ui/button";
import { useTheme } from "~/hooks/use-theme";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const root = document.documentElement;

      if (e) {
        root.style.setProperty("--x", `${e.clientX}px`);
        root.style.setProperty("--y", `${e.clientY}px`);
      }

      document.startViewTransition(() => {
        setTheme(theme === "dark" ? "light" : "dark");
      });
    },
    [setTheme, theme]
  );

  return (
    <Button
      variant="secondary"
      size="icon"
      className="group/toggle size-8"
      onClick={handleThemeToggle}
    >
      <TbBrightness />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
