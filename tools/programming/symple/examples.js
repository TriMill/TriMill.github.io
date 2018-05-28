let examples = {
  hello_world: 'LDI 0x48\nCHR\nLDI 0x65\nCHR\nLDI 0x6C\nCHR\nCHR'+
    '\nLDI 0x6F\nCHR\nLDI 0x20\nCHR\nLDI 0x57\nCHR\nLDI 0x6F\nCHR\nLDI 0x72\nCHR'+
    '\nLDI 0x6C\nCHR\nLDI 0x64\nCHR\nLDI 0x21\nCHR\nHLT',
  echo: 'JMP 2\nCHR\nINP\nCMP 0x6\nJNE 1\nHLT\n0',
  fibonacci: 'JMP [6]\n0\n1\n0\n0x0A\n3000\nLDA [1]\nOUT\nADD [2]\nSTA [3]\nLDA ' +
    '[2]\nSTA [1]\nLDA [3]\nSTA [2]\nLDA [4]\nCHR\nLDA [1]\nCMP [5]\nJLT [7]\nHLT',
  ascii: 'INC\nCHR\nJMP 0',
  powers_two: 'LDA 0xA\nOUT\nMUL 0xB\nSTA 0xA\nLDI 0x20\nCHR\nLDA 0xA\nCMP 0xC' +
    '\nJLT 1\nHLT\n1\n2\n100000'
}
