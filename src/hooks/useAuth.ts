// ==============================|| AUTH HOOKS ||============================== //

const useAuth = () => {
    const context = null;

    if (!context) throw new Error('context must be use inside provider');

    return context;
};

export default useAuth;
