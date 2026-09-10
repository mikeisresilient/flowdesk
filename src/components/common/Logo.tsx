function Logo() {
  return (
    <a
      href="/"
      aria-label="FlowDesk home"
      className="flex items-center gap-2"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F5C542] text-sm font-black text-[#171717]">
        F
      </span>

      <span className="text-xl font-bold tracking-tight text-[#171717]">
        Flow<span className="text-[#D9A514]">Desk</span>
      </span>
    </a>
  )
}

export default Logo