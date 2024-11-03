import CryptoJS from 'crypto-js'

// Тип данных для одного этапа маршрута
interface RouteLeg {
  legId: string
  transportType: string
  origin: string
  destination: string
  event: string
  timestamp: number
}

// Тип данных для заказа с мультимаршрутом
export interface OrderData {
  id: string
  itemName: string
  destination: string
  legs: RouteLeg[]
}

// Класс для блока
class Block {
  index: number
  timestamp: number
  data: OrderData
  previousHash: string
  hash: string

  constructor(
    index: number,
    timestamp: number,
    data: OrderData,
    previousHash = ''
  ) {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
  }

  // Вычисление хеша блока
  calculateHash(): string {
    return CryptoJS.SHA256(
      this.index +
        this.timestamp +
        JSON.stringify(this.data) +
        this.previousHash
    ).toString()
  }
}

// Класс для блокчейна
class Blockchain {
  chain: Block[]

  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  // Создание генезис-блока
  createGenesisBlock(): Block {
    return new Block(
      0,
      Date.now(),
      {
        id: '0',
        itemName: 'Genesis Block',
        destination: 'N/A',
        legs: [],
      },
      '0'
    )
  }

  // Получение последнего блока в цепочке
  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1]
  }

  // Добавление нового блока для сегмента маршрута
  addBlock(newData: OrderData): void {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      newData,
      this.getLatestBlock().hash
    )
    this.chain.push(newBlock)
  }

  // Проверка целостности цепочки блоков
  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const previousBlock = this.chain[i - 1]

      if (
        currentBlock.hash !== currentBlock.calculateHash() ||
        currentBlock.previousHash !== previousBlock.hash
      ) {
        return false
      }
    }
    return true
  }
}

export const logisticsBlockchain = new Blockchain()
