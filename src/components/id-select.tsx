import React from 'react'
import { Select } from 'antd'
import { Raw } from 'types'

type SelectProps = React.ComponentProps<typeof Select>
// 继承select上的类型
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'>{
  value: Raw | number | null | undefined
  onChange: (value?: number) => void
  defaultOptionName?: string
  options?: {name: string, id: number}[]
}
// & SelectProps
/**
 * value  可以传入多种类型的值
 * onChange只会 回调 number | undefined 类型
 * @param props 
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return (
    <Select
      value={toNumber(value)}
      onChange={value => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {
        defaultOptionName ? <Select.Option value={0}>
          {
            defaultOptionName
          }
        </Select.Option> : null
      }
      {
        options?.map(option => <Select.Option value={option.id} key={option.id}>{option.name}</Select.Option>)
      }
    </Select>
  )

}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)