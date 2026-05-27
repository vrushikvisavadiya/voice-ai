export function AuthDivider() {
  return (
    <div className="relative my-2 flex items-center">
      <div className="flex-1 border-t border-border" />
      <span className="mx-4 text-xs text-muted-foreground">
        or continue with
      </span>
      <div className="flex-1 border-t border-border" />
    </div>
  );
}
