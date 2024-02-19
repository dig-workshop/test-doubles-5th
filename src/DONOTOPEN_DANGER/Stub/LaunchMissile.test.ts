import {LaunchFireworkImpl} from './LaunchMissile'
import {StubWeatherRepository} from './StubWeatherRepository'
import {Weather} from './Types'

// LaunchMissileは天気APIに依存しており、返り値によって挙動が変わります。
// このままでは本物のAPIを叩いてしまうので、時間がかかる＋テストができません。
// そこでWeatherRepositoryのスタブ（返り値を固定するもの）を使って、テストできるようにしましょう

describe('LaunchFireworkImpl（花火打ち上げ装置）のテスト', () => {
    it('天気が晴れの場合、返り値が 花火を打ち上げました になること', async () => {
        const stubWeatherRepository = new StubWeatherRepository()
        stubWeatherRepository.getByCity_returnValue = Promise.resolve(Weather.SUNNY)
        const launchMissile = new LaunchFireworkImpl(stubWeatherRepository)


        const result = await launchMissile.launch()


        expect(result).toBe('花火を打ち上げました')
    })

    it('天気が晴れの以外の場合、返り値が 中止しました になること', async () => {
        const stubWeatherRepository = new StubWeatherRepository()
        stubWeatherRepository.getByCity_returnValue = Promise.resolve(Weather.RAINY)
        const launchMissile = new LaunchFireworkImpl(stubWeatherRepository)


        const result = await launchMissile.launch()


        expect(result).toBe('中止しました')
    })
})