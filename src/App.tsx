import { useForm } from 'react-hook-form'
import './App.css'
import { Input } from './components/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
  quantity: z.number({
    errorMap() {
      return {
        message: "Informe um número válido"
      }
    }
  }).positive("Por favor informe um número maior que 0"),
  url: z.string().url('Por favor informe uma URL válida'),
  role: z.enum(['admin', 'user'], {
    errorMap() {
      return {
        message: "Escolha entre admin ou user"
      }
    } 
  }),
}).refine((fields) => fields.password === fields.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas precisam ser iguais'
})

type formProps = z.infer<typeof schema>

function App() {
  const { handleSubmit, register, formState: { errors } } = useForm<formProps>({
    mode: 'all',
    resolver: zodResolver(schema),
  })

  console.log(errors)

  const handleForm = (data: formProps) => {
    console.log(data)
  }

  return (
    <main> 
      <div>
        <h2>
          Advanced Form
        </h2>

        <form onSubmit={handleSubmit(handleForm)}>
          <Input 
            {...register('password')}
            type='password' 
            placeholder='Informe sua senha' 
            label="Senha"
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            key="pass"
          />

          <Input 
            {...register('confirmPassword')}
            type='password' 
            placeholder='Confirme sua senha' 
            label='Confirmação de senha'
            error={!!errors.confirmPassword?.message}
            helperText={errors.confirmPassword?.message}
            key="confirmPass"
          />

          <Input 
            {...register('quantity', {
              setValueAs: (value: string) => parseInt(value, 10)
            })}
            type='number' 
            placeholder='Informe a quantidade' 
            label='Quantidade'
            error={!!errors.quantity?.message}
            helperText={errors.quantity?.message}
            key="qnt"
          />

          <Input 
            {...register('url')}
            type='text' 
            placeholder='Informe a URL' 
            label='Url'
            error={!!errors.url?.message}
            helperText={errors.url?.message}
            key="url"
          />

          <Input
            {...register('role')}
            type='text' 
            placeholder='Informe a permissão' 
            label='Permissão'
            error={!!errors.role?.message}
            helperText={errors.role?.message}
            key="role"
          />
          <button type='submit'>Enviar</button>
        </form>
      </div>
    </main>
  )
}

export default App

