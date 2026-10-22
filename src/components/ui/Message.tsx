import type {ReactNode} from 'react';

export function Message({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="glass mx-auto flex max-w-md flex-col items-center gap-3 rounded-xl2 px-6 py-12 text-center">
      <h2 className="display-title text-xl text-white">{title}</h2>
      {children ? <p className="text-sm text-white/60">{children}</p> : null}
      {action}
    </div>
  );
}
