/**
 * Расширение базовой модели vuex-orm поддержкой api-маршрутов.
 * @author Egor Vasyakin egor@evas-php.com
 * @license CC-BY-4.0
 */
import api from '@/api'
import { Model } from '@vuex-orm/core'
// import Fieldset from '@/core/Fieldset.js'

export default class extends Model {
    /**
     * Получение api-маршрута по имени из массива маршрутов модели.
     * @param string|int имя маршрута
     * @return string|array|null
     */
    static getRoute(name) {
        if (!this.routes) return null
        return this.routes[name]
    }

    /**
     * Проверка наличия api-маршрута.
     * @param string|int имя маршрута
     * @return bool
     */
    static hasRoute(name) {
        let route = this.getRoute(name)
        return route && (['string','object'].includes(typeof route)) && route.length > 0
    }

    /**
     * Выполнение api-маршрута.
     * @param string|int имя маршрута
     * @param mixed аргументы
     * @param function обработчик результата
     */
    static doRoute(name, args, cb) {
        if (this.hasRoute(name)) {
            let route = this.getRoute(name)
            if ('string' === typeof route) route = [route]
            let handler = api
            for (let sub of route) {
                // console.log(sub)
                handler = handler[sub]
                if (!handler) {
                    let className = this.entity // this.prototype.constructor.name
                    throw new Error(
                        `Не найден Api endpoint "${sub}" для роута "${name}" модели "${className}"`
                    )
                }
            }
            handler(args, cb)
        } 
    }

    /**
     * Вызов хука по имени.
     * @param string имя хука
     * @param mixed аргументы вызова хука
     * @return mixed результат вызова или аргументы
     */
    static hook(name, data) {
        return 'function' === typeof this[name] ? this[name](data) : data
    }

    /**
     * Обёртка вызова API-запроса.
     */
     static doRouteExtra(name, args, cb) {
        console.log(`-- ${this.entity}: run ${name}`)
        let upperName = name.toUpperCase()
        this.doRoute(name, args, data => {
            data = this.hook(`before${upperName}`, data)
            console.log(data)
            this.insertOrUpdate({data: data}).then((entities) => {
                console.log(entities)
                this.hook(`after${upperName}`, entities)
                if (typeof cb === 'function') cb(entities)
                console.log(`-- ${this.entity}: end ${name}`)
            })
        })
     }

    /**
     * Вызов api-маршрута на получение списочных данных.
     * @param mixed аргументы маршрута
     * @param function обработчик результата
     */
    static fetch(args, cb) {
        return this.doRouteExtra('fetch', args, cb)
    }

    /**
     * Вызов api-маршрута на получение одиночных данных.
     * @param mixed аргументы маршрута
     * @param function обработчик результата
     */
    static fetchOne(args, cb) {
        return this.doRouteExtra('fetchOne', args, cb)
    }

    /**
     * Свойства валидации данных модели при добавлении.
     * @return array
     */
    // static fieldsetProps() {
    //     return []
    // }

    /**
     * Получение валидатора модели.
     * @return Fieldset
     */
    // static fieldset() {
    //     const fieldset = new Fieldset(this.fieldsetProps())
    //     return fieldset
    // }

    /**
     * Вставка данных из формы.
     * @param Node html-форма c данными
     * @param function колбэк успеха
     * @param function колбэк провала
     */
    static insertForm(form, successCb, errorCb) {
        let data = {}
        for (let field of form) {
            if (field.name) data[field.name] = field.value
        }
        return this.insertIfValid(data, successCb, errorCb)
    }

    /**
     * Вставка данных модели.
     * @param array данные
     * @param function колбэк успеха
     * @param function колбэк провала
     */
    // static insertIfValid(data, successCb, errorCb) {
    //     let fieldset = this.fieldset()
    //     if (fieldset.isValid(data, true)) {
    //         this.inserting(data, successCb, errorCb)
    //     } else {
    //         errorCb(fieldset.errors)
    //     }
    // }

    /**
     * Отправка данных для вставки на бекэнд.
     * @param array данные
     * @param function колбэк успеха
     */
    // static inserting(data, successCb) {
    //     this.doRouteExtra('save', data, successCb)
    // }
}
