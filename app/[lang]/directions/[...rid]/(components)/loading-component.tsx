export const LoadingComponent = ({ message }: { message: string }) => (
  <section className="layout-mx flex flex-col">
    <div className="flex w-full flex-col justify-between gap-x-8 gap-y-12 lg:flex-row">
      <div className="card-base grow">{message}</div>
    </div>
  </section>
);
