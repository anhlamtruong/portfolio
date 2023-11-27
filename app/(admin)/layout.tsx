import { ModalProvider } from "@/providers/modal_provider";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-full">
      <main>
        <ModalProvider />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
