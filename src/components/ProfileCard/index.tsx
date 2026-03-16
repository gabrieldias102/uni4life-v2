export default function ProfielCard() {
  return (
    <div>
      <div className="mx-auto flex max-w-3xl flex-col justify-center gap-6 pt-12 mt-12 bg-white rounded-xl shadow-md">
        <div className="flex px-8 gap-4">
          <div>
            <img
              src="https://api.dicebear.com/9.x/adventurer/svg?seed=John Doe"
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div>
            <div>
              <h1 className="text-2xl font-bold text-black">Nome</h1>
              <p className="text-md text-gray-600">email@email.com.br</p>
              <p className="text-md text-gray-600">Curso</p>
              <p className="text-md text-gray-600">Resumo</p>
            </div>
          </div>
        </div>
        <div className="flex gap-8 px-32 pb-12">
          <div>
            <div className="font-bold">24</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div>
            <div className="font-bold">24</div>
            <div className="text-sm text-gray-600">Conexões</div>
          </div>
        </div>
      </div>
    </div>
  );
}
